const TEXT_NODE = 3;
const SCRIPT_NODE_NAME = 'script';
const STYLE_NODE_NAME = 'style';

function isTextNode(node) {
    return node.nodeType === TEXT_NODE;
}

function isSafeElementNode(node) {
    if (node.nodeName !== undefined) {
        var nodeName = node.nodeName.toLowerCase();
        return !(nodeName === SCRIPT_NODE_NAME || nodeName === STYLE_NODE_NAME);
    }

    return true;
}

function makeAllNodesChill(sourceNode) {
    if (isTextNode(sourceNode)) {
        makeNodeChill(sourceNode);
    }

    if (isSafeElementNode(sourceNode)) {
        for (var node in sourceNode.childNodes) {
            makeAllNodesChill(sourceNode.childNodes[node]);
        }
    }
}

function makeNodeChill(node) {
    if (node.textContent !== undefined) {
        var textContent = node.textContent;

        // Lowercase is so rad.
        textContent = textContent.toLowerCase();

        textContent = textContent.replace(/pretty/g, 'p');
        textContent = textContent.replace(/very/g, 'v');
        textContent = textContent.replace(/as fuck/g, 'af');
        textContent = textContent.replace(/god damn/g, 'gd');
        textContent = textContent.replace(/point/g, 'fleek');

        node.textContent = textContent;
    }
}

makeAllNodesChill(document);
