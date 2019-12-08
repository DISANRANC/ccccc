import { Message } from 'element-ui';
function messageBox (message,type) {
    return Message({
        message: message,
        type: type,
        showClose: true,
        center: true,
    })
}
export default messageBox;