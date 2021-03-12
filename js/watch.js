/*
 * @Author: your name
 * @Date: 2021-03-12 22:32:09
 * @LastEditTime: 2021-03-12 22:38:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-min-vue\js\watch.js
 */
class Watcher {
	constructor(vm, key, cb) {
		this.vm = vm;
		// data中的属性
		this.key = key;
		// 负责更新视图的回调
		this.cb = cb;
		// 把watcher对象记录到Dep类的静态属性target中
		Dep.target = this;
		// 触发get方法 在get方法中调用addSub
		this.oldValue = vm[key];
		Dep.target = null;
	}

	// 数据发生改变时更新视图
	update() {
		let newVal = this.vm[this.key];
		if (this.oldValue === newVal) return;
		this.cb(newVal);
	}
}
