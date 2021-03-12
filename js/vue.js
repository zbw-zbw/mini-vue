/*
 * @Author: your name
 * @Date: 2021-03-10 22:27:44
 * @LastEditTime: 2021-03-12 21:55:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-min-vue\js\vue.js
 */
class Vue {
	constructor(options) {
		// 1、通过属性保存选项的数据
		this.$options = options || {};
		this.$data = options.data || {};
		this.$el = typeof options.el === "string" ? document.querySelector(options.el) : options.el;
		// 2、把data中的成员转换为getter和setter 注入到Vue实例中
		this._proxyData(this.$data);
		// 3、调用observer对象，监听数据的改变
    new Observer(this.$data)
		// 4、调用complier对象，解析指令和插值表达式
		new Compiler(this)
	}

	_proxyData(data) {
		Object.keys(data).forEach(key => {
			Object.defineProperty(this, key, {
				enumerable: true,
        configurable: true,
				get() {
					return data[key];
				},
				set(newVal) {
					if (newVal === data[key]) return;
					data[key] = newVal;
				}
			});
		});
	}
}
