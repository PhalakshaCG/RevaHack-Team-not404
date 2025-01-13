const { startLoading, stopLoading } = require("./loader");

const postReportArticle = async (Contract, Provider,reportTag, reportID, address,  newsLang, headline, content, rating) => {
    startLoading();
    console.log(address,  newsLang, headline, content, rating);
    let nonce = await Provider.eth.getTransactionCount(address);
    console.log({
        nonce
    });
    let gasLimit = await Provider.eth.getBlock('latest');
    gasLimit = gasLimit.gasLimit;
    let post = await Contract.methods.reportArticle(parseInt(reportTag), reportID, address,  newsLang, headline, content, rating)
    .send({
          from:address,
          gas:gasLimit,
          gasPrice: 50000000000,
          nonce
    })
    stopLoading();
    alert("Review posted")
    fetch("http://localhost:4000/post/addpost",{
            method: "post",
            body: JSON.stringify({
                  postid : post.events.post.returnValues.id,
                  tagid : 0,
                  userid: address
            }),
            headers: {
                  'Content-Type': 'application/json'
                },
      }).then((data)=> data.json().then((_data)=> console.log(_data)))
      .catch((err)=>console.log(err));
    console.log(post)
};

export default postReportArticle;