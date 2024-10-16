const modelRequest = async(messages, openia) =>{
    //El modelo de openia recibe un array de mensaje pero devuelve uno final que es igual a role:assistant, content:... 

    const completion = await openia.chat.completions.create({
      //conversation deber llegar desde el front
       messages: messages,
       model: "gpt-4o-mini",
    });

    if(completion.choices[0].message.refusal) throw Error('mensaje rechazado por el modelo IA');

    // #FEEDFACKFINAL
    const arr = completion.choices[0].message.content.split(" ");
    const leng = arr.length 
    console.log('ULTIMA PALABRA ',arr[leng - 1]);
    const flag = arr[leng - 1] 
    
    return completion.choices[0].message;

}

module.exports ={modelRequest};


