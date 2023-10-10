var $4ZQwy$quill = require("quill");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $75af697ace5b2e46$export$9099ad97b570f7c; });

const $6eb4b7177b9af429$var$Link = $parcel$interopDefault($4ZQwy$quill).import('formats/link');
class $6eb4b7177b9af429$export$9099ad97b570f7c extends $6eb4b7177b9af429$var$Link {
    static create(value) {
        const node = super.create(value);
        const { properties: properties , id: id  } = value;
        node.setAttribute('id', id);
        node.setAttribute('href', null);
        return $6eb4b7177b9af429$export$9099ad97b570f7c.render(node, properties);
    }
    static render(node, properties) {
        node.textContent = properties.file.name;
        return node;
    }
}
$6eb4b7177b9af429$export$9099ad97b570f7c.blotName = 'attachment';
$6eb4b7177b9af429$export$9099ad97b570f7c.tagName = 'a';


var $dfe3295af169d557$exports = {};
$dfe3295af169d557$exports = JSON.parse("{\"ID_PREFIX\":\"QUILL_ATTACHMENT\"}");



const $ae2dda078d13e372$var$Module = $parcel$interopDefault($4ZQwy$quill).import('core/module');
const $ae2dda078d13e372$var$generateId = ()=>{
    const name = (/*@__PURE__*/$parcel$interopDefault($dfe3295af169d557$exports)).ID_PREFIX;
    const id = new Date().getTime();
    return `${name}_${id}`;
};
class $ae2dda078d13e372$export$9099ad97b570f7c extends $ae2dda078d13e372$var$Module {
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
        const attachmentId = $ae2dda078d13e372$var$generateId();
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
        this.quillEditorRef.getModule('clipboard').addMatcher('A', (node, delta)=>{
            if (delta.ops && delta.ops[0] && delta.ops[0].attributes && delta.ops[0].attributes.attachment) {
                const newDelta = new Delta();
                newDelta.ops = [
                    {
                        attributes: {
                            link: delta.ops[0].attributes.attachment
                        },
                        insert: delta.ops[0].insert
                    }, 
                ];
                return newDelta;
            }
            return delta;
        });
    }
}



$parcel$interopDefault($4ZQwy$quill).register({
    'formats/attachment': $6eb4b7177b9af429$export$9099ad97b570f7c
});
var $75af697ace5b2e46$export$9099ad97b570f7c = $ae2dda078d13e372$export$9099ad97b570f7c;


//# sourceMappingURL=index.js.map
