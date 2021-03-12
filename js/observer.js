/*
 * @Author: your name
 * @Date: 2021-03-10 22:36:56
 * @LastEditTime: 2021-03-12 22:36:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-min-vue\js\observer.js
 */
class Observer {
	constructor(data) {
		this.walk(data);
	}
	walk(data) {
		if (!data || typeof data !== "object") return;

		// 遍历data中所有属性
		Object.keys(data).forEach(key => {
			this.defineReactive(data, key, data[key]);
		});
	}

	defineReactive(obj, key, val) {
		let that = this;
		// 收集依赖 并发送通知
		let dep = new Dep();
		// 如果val是对象 把val内部的属性变为响应式对象
		this.walk(val);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				// 收集依赖
				Dep.target && dep.addSub(Dep.target);
				return val;
			},
			set(newValue) {
				if (newValue === val) return;
				val = newValue;
				// 如果newValue是对象 把val内部的属性变为响应式对象
				that.walk(newValue);
				// 发送通知
				dep.notify();
			}
		});
	}
}
