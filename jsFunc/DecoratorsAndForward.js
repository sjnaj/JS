/* eslint-disable no-func-assign */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-18 23:03:10
 * @LastEditTime: 2022-02-20 16:30:28
 */
{
    // 假设我们有一个 CPU 重负载的函数 slow(x)，但它的结果是稳定的。换句话说，对于相同的 x，它总是返回相同的结果。

    // 如果经常调用该函数，我们可能希望将结果缓存（记住）下来，以避免在重新计算上花费额外的时间。

    function slow(x) {
        // 这里可能会有重负载的 CPU 密集型工作
        console.log(`Called with ${x}`);
        return x;
    }

    function cachingDecorator(func) {
        let cache = new Map();

        return function (x) {
            if (cache.has(x)) {    // 如果缓存中有对应的结果
                return cache.get(x); // 从缓存中读取结果
            }

            let result = func(x);  // **否则就调用 func

            cache.set(x, result);  // 然后将结果缓存（记住）下来
            return result;
        };
    }

    slow = cachingDecorator(slow);//装饰

    console.log(slow(1)); // slow(1) 被缓存下来了，并返回结果
    console.log("Again: " + slow(1)); // 返回缓存中的 slow(1) 的结果

    console.log(slow(2)); // slow(2) 被缓存下来了，并返回结果
    console.log("Again: " + slow(2)); // 返回缓存中的 slow(2) 的结果

    //  cachingDecorator 是一个 装饰器（decorator）：一个特殊的函数，它接受另一个函数并改变它的行为。

    //     *从外部代码来看，包装的 slow 函数执行的仍然是与之前相同的操作。它只是在其行为上添加了缓存功能。

    //     总而言之，使用分离的 cachingDecorator 而不是改变 slow 本身的代码有几个好处：

    //     *cachingDecorator 是可重用的。我们可以将它应用于另一个函数。
    //     *缓存逻辑是独立的，它没有增加 slow 本身的复杂性（如果有的话）。
    //     如果需要，我们可以组合多个装饰器（其他装饰器将遵循同样的逻辑）。

    //上面提到的缓存装饰器不适用于对象方法。

    // *原因是包装器将原始函数调用为 (**) 行中的 func(x)。并且，当这样调用时，函数将得到 this = undefined（严格模式下裸函数的this）。

    //如果尝试运行下面这段代码，我们会观察到类似的问题：
    // let func = worker.slow;
    // func(2);//Error: Cannot read property 'slow' of undefined

    {
        //有一个特殊的内建函数方法 func.call(context, …args)，它允许调用一个显式设置 this 的函数。

        function sayHi() {
            console.log("this is " + this.name);
        }

        let user = { name: "John" };
        let admin = { name: "Admin" };

        // 使用 call 将不同的对象传递为 "this"
        sayHi.call();//this is undefined
        sayHi.call(user); //this is  John
        sayHi.call(admin); //this is Admin
        let worker = {
            someMethod() {
                return 1;
            },

            slow(x) {
                console.log("Called with " + x);
                return x * this.someMethod(); // (*)
            }
        };

        function cachingDecorator(func) {
            let cache = new Map();
            return function (x) {
                if (cache.has(x)) {
                    return cache.get(x);
                }
                let result = func.call(this, x); // 现在 "this" 被正确地传递了
                cache.set(x, result);
                return result;
            };
        }

        worker.slow = cachingDecorator(worker.slow); // *现在对其进行缓存装饰

        console.log(worker.slow(2)); // 工作正常
        console.log(worker.slow(2)); // 工作正常，没有调用原始函数（使用的缓存）

        // 在经过装饰之后，worker.slow 现在是包装器 function (x) { ... }。
        // *因此，当 worker.slow(2) 执行时，包装器将 2 作为参数，并且 this=worker（它是点符号 . 之前的对象）。
        // !在包装器内部，假设结果尚未缓存，func.call(this, x) 将当前的 this（=worker）和当前的参数（=2）传递给原始方法（装饰时被存储起来了）。



    }
    {//传递多参数
        //         这儿有许多解决方案可以实现：

        // 实现一个新的（或使用第三方的）类似 map 的更通用并且允许多个键的数据结构。
        // 使用嵌套 map：cache.set(min) 将是一个存储（键值）对 (max, result) 的 Map。所以我们可以使用 cache.get(min).get(max) 来获取 result。
        // *将两个值合并为一个。为了灵活性，我们可以允许为装饰器提供一个“哈希函数”，该函数知道如何将多个值合并为一个值。
        //对于许多实际应用，第三种方式就足够了

        let worker = {
            slow(min, max) {
                console.log(`Called with ${min},${max}`);
                return min + max;
            }
        };

        function cachingDecorator(func, hash) {
            let cache = new Map();
            return function () {
                let key = hash(arguments); // (*)
                if (cache.has(key)) {
                    return cache.get(key);
                }
                // func.call(context, ...args);
                // func.apply(context, args);
                //*一个参数展开，一个直接以数组方式
                // let result = func.call(this, ...arguments); // (**)
                //apply 可能会更快，因为大多数 JavaScript 引擎在内部对其进行了优化。
                let result = func.apply(this, arguments); // (**)

                //*将所有参数连同上下文一起传递给另一个函数被称为“呼叫转移（call forwarding）”。
                //当外部代码调用这种包装器时，它与原始函数的调用是无法区分的。


                cache.set(key, result);
                return result;
            };
        }

        function hash(...args) {
            return args.join();
        }

        worker.slow = cachingDecorator(worker.slow, hash);

        console.log(worker.slow(3, 5)); // works
        console.log("Again " + worker.slow(3, 5)); // same (cached)
    }





}
{//实例
    {
        // 创建一个装饰器 spy(func)，它应该返回一个包装器，该包装器将所有对函数的调用保存在其 calls 属性中。

        // 每个调用都保存为一个参数数组。
        function work(a, b) {
            console.log(a + b); // work 是一个任意的函数或方法
        }
        function spy(func) {
            wrapper.calls = [];//定义属性
            function wrapper(...args) {
                let result = func.apply(this, args);
                wrapper.calls.push(args);
                return result;//考虑有返回值的情况
            }
            return wrapper;//直接return的话spy里看不见f
        }
        work = spy(work);

        work(1, 2); // 3
        work(4, 5); // 9
        for (let args of work.calls) {
            console.log('call:' + args.join()); // "call:1,2", "call:4,5"
        }
    }
    {
        //     debounce(f, ms) 装饰器的结果是一个包装器，该包装器将暂停对 f 的调用，
        //     直到经过 ms 毫秒的非活动状态（没有函数调用，“冷却期”），然后使用最新的参数调用 f 一次。
        //     举个例子，我们有一个函数 f，并将其替换为 f = debounce(f, 1000)。

        // 然后，如果包装函数分别在 0ms、200ms 和 500ms 时被调用了，之后没有其他调用，那么实际的 f 只会在 1500ms 时被调用一次。
        // 也就是说：从最后一次调用开始经过 1000ms 的冷却期之后。
        let f = debounce(console.log, 1000);

        f("a");
        setTimeout(() => f("b"), 200);
        setTimeout(() => f("c"), 500);
        // 防抖函数从最后一次函数调用以后等待 1000ms，然后执行：alert("c")

        function debounce(func, ms) {
            let timeout;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, arguments), ms);
                //调用 debounce 会返回一个包装器。当它被调用时，它会安排一个在给定的 ms 之后对原始函数的调用，并取消之前的此类超时。
            };
        }
    }
    {
        //  创建一个“节流”装饰器 throttle(f, ms) —— 返回一个包装器。

        // 当被多次调用时，它会在每 ms 毫秒最多将调用传递给 f 一次。

        // 与去抖的不同是，它是个完全不同的装饰器：

        // debounce 会在“冷却（cooldown）”期后运行函数一次。适用于处理最终结果。
        // throttle 运行函数的频率不会大于所给定的时间 ms 毫秒。适用于不应该经常进行的定期更新

        //         我们想要在鼠标指针移动时，更新网页上的某些信息。

        // ……但是更新函数 update() 太重了，无法在每个微小移动上都执行。高于每 100ms 更新一次的更新频次也没有意义。

        // 因此，我们将其包装到装饰器中：使用 throttle(update, 100) 作为在每次鼠标移动时运行的函数，而不是原始的 update()。装饰器会被频繁地调用，但是最多每 100ms 将调用转发给 update() 一次。

        // 在视觉上，它看起来像这样：

        // 对于第一个鼠标移动，装饰的变体立即将调用传递给 update。这很重要，用户会立即看到我们对其动作的反应。
        // 然后，随着鼠标移动，直到 100ms 没有任何反应。装饰的变体忽略了调用。
        // 在 100ms 结束时 —— 最后一个坐标又发生了一次 update。
        // 然后，最后，鼠标停在某处。装饰的变体会等到 100ms 到期，然后用最后一个坐标运行一次 update。因此，非常重要的是，处理最终的鼠标坐标。
        function f(a) {
            console.log(a);
        }

        // f1000 最多每 1000ms 将调用传递给 f 一次
        let f1000 = throttle(f, 1000);

        f1000(1); // 显示 1
        f1000(2); // (节流，尚未到 1000ms)
        f1000(3); // (节流，尚未到 1000ms)

        // 当 1000ms 时间到...
        // ...输出 3，中间值 2 被忽略

    }
    function throttle(func, ms) {

        let isThrottled = false,//初始状态不在冷却
            savedArgs,
            savedThis;
        //上下文和参数（arguments）同等重要，应该被记下来。虽然这个函数并不需要(没有对象函数)

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }
            isThrottled = true;

            func.apply(this, arguments); // (1) 执行函数
            //初始时要执行函数，否则可以放在调度里


            setTimeout(function () {//进入冷却期，只更新参数，不执行
                isThrottled = false; // (3) 结束冷却
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);//*以最新参数执行wrapper函数
                    savedArgs = savedThis = null;//置空
                }
            }, ms);
        }

        return wrapper;
    }
}