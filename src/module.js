import constant from './constants';
import Quill from 'quill'

const Module = Quill.import('core/module');

const generateId = () => {
  const name = constant.ID_PREFIX
  const id = new Date().getTime();
  return `${name}_${id}`;
}

export default class AttachmentModule extends Module {

  constructor(quill, options) {
    super();
    this.quill = quill;
    this.options = options;
    this.range = null;

    if (typeof (this.options.upload) !== "function") {
      console.warn('[Missing config] upload function that returns a promise is required');
    }

    this.quill
      .getModule("toolbar")
      .addHandler("file", this.selectLocalImage.bind(this));

    this.quill
      .getModule('clipboard')
			.addMatcher('A', (node, delta) => {
				if (delta.ops && delta.ops[0] && delta.ops[0].attributes && delta.ops[0].attributes.attachment) {
					const newDelta = { ops: null }
					newDelta.ops = [
						{
							attributes: {
								link: delta.ops[0].attributes.attachment,
							},
							insert: delta.ops[0].insert,
						},
					]
					return newDelta
				}
				return delta
			})
  }

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
    const attachmentId = generateId();
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      let base64content = fileReader.result;
      this.insertAttachment({ dataUrl: base64content, file, id: attachmentId });
    }, false);

    if (file) {
      fileReader.readAsDataURL(file);
    }

    this.options.upload(file)
      .then((url) => {
        this.updateAttachment(attachmentId, url);
      })
      .catch(error => {
        console.warn(error.message);
      })
  }

  insertAttachment({ dataUrl, file, id }) {
    this.quill.insertEmbed(
      this.range.index,
      "attachment",
      {
        id,
        properties: { dataUrl, file },
        render: this.options.render
      }
    );
  }

  updateAttachment(id, url) {
    const element = document.getElementById(id);
    if (element) {
      element.setAttribute('href', url);
      element.removeAttribute('id');
      if (typeof this.options.onFileUploaded === "function") {
        this.options.onFileUploaded(element, { url })
      }
    }
  }

}
