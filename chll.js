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

        // Articles are not rad.
        textContent = textContent.replace(/(a|an|the)(?=\s)/g, '');

        // Here's some words that aren't rad. No lookback in JS Regex :(
        textContent = textContent.replace(/\syour(?=\s)/g, ' yr');
        textContent = textContent.replace(/\syou(?=\s)/g, ' u');
        textContent = textContent.replace(/\sis(?=\s)/g, ' =');
        textContent = textContent.replace(/to(?=\s)/g, '->');
        textContent = textContent.replace(/for(?=\s)/g, 'fr');
        textContent = textContent.replace(/pretty/g, 'p');
        textContent = textContent.replace(/very/g, 'v');

        // And here's some word endings that aren't rad.
        textContent = textContent.replace(/ion/g, '');
        textContent = textContent.replace(/er/g, 'r');
        textContent = textContent.replace(/ies/g, 's');

        node.textContent = textContent;
    }
}

makeAllNodesChill(document);
