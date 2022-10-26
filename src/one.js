// import '@babel/polyfill'
import Two from './Two'
const test = (num) => {
    console.log("test函数哈哈" + num);
}
test(Two.y);
function testable(target) {
    target.isTestable = true;
}
@testable
class MyTestableClass { }
console.log("装饰器语法", MyTestableClass.isTestable) // true
const delay = new Promise(resolve => console.log("new Promise()"));
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();

