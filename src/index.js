import Attachment from './formats/attachment'
import Module from './module'
import Quill from 'quill'

Quill.register({
  'formats/attachment': Attachment
});

export default Module
