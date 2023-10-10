import Quill from 'quill'

const Link = Quill.import('formats/link');

export default class Attachment extends Link {

  static create(value) {
    const node = super.create(value);
    const { properties, id } = value
    node.setAttribute('id', id);
    node.setAttribute('href', null);
    return this.render(node, properties);
  }

  render(node, properties) {
    node.textContent = properties.file.name
    return node
  }

}

Attachment.blotName  = 'attachment';
Attachment.tagName   = 'a';
