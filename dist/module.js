import $5DPjF$quill from "quill";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

const $434c7ee89e186ac0$var$Link = $5DPjF$quill.import('formats/link');
class $434c7ee89e186ac0$export$9099ad97b570f7c extends $434c7ee89e186ac0$var$Link {
    static create(value) {
        console.log(value);
        const node = super.create(value);
        const { properties: properties , id: id  } = value;
        node.setAttribute('id', id);
        node.setAttribute('href', null);
        return $434c7ee89e186ac0$export$9099ad97b570f7c.render(node, properties);
    }
    static render(node, properties) {
        node.textContent = properties.file.name;
        return node;
    }
}
$434c7ee89e186ac0$export$9099ad97b570f7c.blotName = 'attachment';
$434c7ee89e186ac0$export$9099ad97b570f7c.tagName = 'a';


var $c519769cb60f3fe6$exports = {};
$c519769cb60f3fe6$exports = JSON.parse("{\"ID_PREFIX\":\"QUILL_ATTACHMENT\"}");



const $08bece949e9c5358$var$Module = $5DPjF$quill.import('core/module');
const $08bece949e9c5358$var$generateId = ()=>{
    const name = (/*@__PURE__*/$parcel$interopDefault($c519769cb60f3fe6$exports)).ID_PREFIX;
    const id = new Date().getTime();
    return `${name}_${id}`;
};
class $08bece949e9c5358$export$9099ad97b570f7c extends $08bece949e9c5358$var$Module {
    selectLocalImage() {
        this.range = this.quill.getSelection();
        this.fileHolder = document.createElement("input");
        this.fileHolder.setAttribute("type", "file");
        this.fileHolder.setAttribute('accept', '*/*');
        this.fileHolder.onchange = this.fileChanged.bind(this);
        this.fileHolder.click();
    }
    fileChanged() {
        const file = this.fileHolder.files[0];
        const attachmentId = $08bece949e9c5358$var$generateId();
        const fileReader = new FileReader();
        fileReader.addEventListener("load", ()=>{
            let base64content = fileReader.result;
            this.insertAttachment({
                dataUrl: base64content,
                file: file,
                id: attachmentId
            });
        }, false);
        if (file) fileReader.readAsDataURL(file);
        this.options.upload(file).then((url)=>{
            this.updateAttachment(attachmentId, url);
        }).catch((error)=>{
            console.warn(error.message);
        });
    }
    insertAttachment({ dataUrl: dataUrl , file: file , id: id  }) {
        this.quill.insertEmbed(this.range.index, "attachment", {
            id: id,
            properties: {
                dataUrl: dataUrl,
                file: file
            },
            render: this.options.render
        });
    }
    updateAttachment(id, url) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('href', url);
            element.removeAttribute('id');
            if (typeof this.options.onFileUploaded === "function") this.options.onFileUploaded(element, {
                url: url
            });
        }
    }
    constructor(quill, options){
        super();
        this.quill = quill;
        this.options = options;
        this.range = null;
        if (typeof this.options.upload !== "function") console.warn('[Missing config] upload function that returns a promise is required');
        this.quill.getModule("toolbar").addHandler("file", this.selectLocalImage.bind(this));
    }
}



$5DPjF$quill.register({
    'formats/attachment': $434c7ee89e186ac0$export$9099ad97b570f7c
});
var $998a35880d9928cc$export$9099ad97b570f7c = $08bece949e9c5358$export$9099ad97b570f7c;


export {$998a35880d9928cc$export$9099ad97b570f7c as default};
//# sourceMappingURL=module.js.map
