/*
 * @Author: your name
 * @Date: 2021-03-10 22:54:24
 * @LastEditTime: 2021-03-12 22:48:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-min-vue\js\compiler.js
 */
class Compiler {
	constructor(vm) {
		this.el = vm.$el;
		this.vm = vm;
		this.compile(this.el);
	}
	// 编译模板 处理文本节点和元素节点
	compile(el) {
		let childNodes = el.childNodes;
		Array.from(childNodes).forEach(node => {
			// 处理文本节点
			if (this.isTextNode(node)) {
				this.compileText(node);
				// 处理元素节点
			} else if (this.isElementNode(node)) {
				this.compileElement(node);
			}
			// 递归调用compile 处理子节点
			if (node.childNodes && node.childNodes.length) {
				this.compile(node);
			}
		});
	}
	// 编译元素节点 处理指令
	compileElement(node) {
		// console.dir(node.attributes);
		Array.from(node.attributes).forEach(attr => {
			let attrName = attr.name;
			if (this.isDirective(attrName)) {
				attrName = attrName.substr(2); // v-text -> text
				let key = attr.value; // msg / count
				this.update(node, key, attrName);
			}
		});
	}

	// 辅助函数
	update(node, key, attrName) {
		let updateFn = this[attrName + "Updater"];
		updateFn && updateFn.call(this, node, this.vm[key], key);
	}

	// 处理v-text指令
	textUpdater(node, value, key) {
		node.textContent = value;
		new Watcher(this.vm, key, newVal => {
			node.textContent = newVal;
		});
	}

	// 处理v-model指令
	modelUpdater(node, value, key) {
		node.value = value;
		new Watcher(this.vm, key, newVal => {
			node.value = newVal;
		});
		// 双向绑定
		node.addEventListener("input", () => {
			this.vm[key] = node.value;
		});
	}

	// 编译文本节点 处理插值表达式
	compileText(node) {
		// console.dir(node);
		// {{ msg }}
		const reg = /\{\{(.+?)\}\}/;
		let value = node.textContent;
		if (reg.test(value)) {
			let key = RegExp.$1.trim();
			node.textContent = value.replace(reg, this.vm[key]);

			// 创建Watcher对象 数据改变更新视图
			new Watcher(this.vm, key, newVal => {
				node.textContent = newVal;
			});
		}
	}

	// 判断元素是否是指令
	isDirective(attrName) {
		return attrName.startsWith("v-");
	}

	// 判断元素是否为文本节点
	isTextNode(node) {
		return node.nodeType === 3;
	}

	// 判断元素是否为元素节点
	isElementNode(node) {
		return node.nodeType === 1;
	}
}
