// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    //编辑器变化时的回调函数
    onChange(editor) {
        //获取富文本的内容
        const html = editor.getHtml()
        console.log('editor content', html)
        // 也可以同步到 <textarea>
        //为了后续快速搜集表单内容做铺垫
        document.querySelector('.publish-content').value = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    //为指定编辑器创建工具栏
    editor,
    //工具栏创建的位置
    selector: '#toolbar-container',
    //工具栏配置对象
    config: toolbarConfig,
    //配置集成模式
    mode: 'default', // or 'simple'
})