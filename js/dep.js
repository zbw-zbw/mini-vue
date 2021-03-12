/*
 * @Author: your name
 * @Date: 2021-03-12 22:27:28
 * @LastEditTime: 2021-03-12 22:29:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-min-vue\js\dep.js
 */
class Dep {
	constructor() {
		this.subs = [];
	}

	// 添加观察者
	addSub(sub) {
		if (sub && sub.update) {
			this.subs.push(sub);
		}
	}
	// 发送通知
	notify() {
		this.subs.forEach(sub => {
			sub.update();
		});
	}
}
