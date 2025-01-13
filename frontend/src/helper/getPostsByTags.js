import getAdByTag from "./getAdByTags";

const rpcCallForTransaction = async (contract, Provider, tag, address) => {
    try {
      console.log(`Performing RPC`,tag, address);
      
      const nonce = await Provider.eth.getTransactionCount(address);
      let gasLimit = await Provider.eth.getBlock('latest');
      gasLimit = gasLimit.gasLimit;
      console.log(nonce, gasLimit);
      const _post = contract.methods.getPostByTag(tag);
      let post = await _post.call();
      console.log(post)
      _post.send({
        from:address,
        gasPrice: 50000000000,
        gas: gasLimit,
        nonce
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      });
      return post;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getPostByTags = async (Contract, adContract, Provider, tags, limit, address) => {
         
    tags = [0,1,2,3,4]
    let tag_list_json;
    let tag_list;
    try{
      tag_list_json = await fetch("http://localhost:4000/tags");
      tag_list = await tag_list_json.json();
    }
    catch (err) {
      console.log(err);
    }
    
    let posts = []
    for(let i=0; i<limit; i++){
      let tag = tags[i % tags.length];
      let post_rpc = await rpcCallForTransaction( Contract, Provider, tag, address);
      let post = {...post_rpc};
      if(!post)
        continue;
      console.log(post);
      // if(i==2){
      //   getAdByTag(adContract, [0,1,2]).then((ad)=>{
      //     post.ad = ad;
      //   })
      // }
      let tagInd = null
      if(post.tag==0)
            tagInd = 7
        else
            tagInd = post.tag -1
      let _post = {
            id: parseInt(post.id),
            title: post.headline,
            description: post.content,
            tags: [{
                    id: post.tag,
                    name: tag_list[tagInd]?.name,//should add db query here
                }],
            reportIDs: post.reports,
            rating:post.rating,
            interactions:post.interactions,
            truth:post.truth,
        }
        if(post.isReportPost){
          let report = await Contract.methods.reportStats(post.id).call();
          console.log(report);
          post.confirmations = report.confirmations;
          post.refutations = report.refutations;
      }
      posts.push(_post);
    }
    console.log(posts);
    return posts;
}

export default getPostByTags;

// Client ID: 04dc5e808d9d0820b803c18d362cd6c1
//Secret Key: hXTlRxQ0pEN4RfuSqeed4O0HyDRvR8zZ7bsrgF0_VJgKrj0GJ9njcyMXBpjLio_qr7IIt0aLn6HoLMG4jmOzXQ