const crypto = require('crypto');

exports.sourceNodes = async (
  { boundActionCreators },
  { fetch, type }
) => {
  const { createNode } = boundActionCreators;

  fetch().then((body) => {
    const node = {
      id: type,
      parent: null,
      children: [],
      internal: {
        type,
        contentDigest: crypto.createHash('md5').update(body).digest('hex'),
      },
      body
    };

    createNode(node);
  });
}
