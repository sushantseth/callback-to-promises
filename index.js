const fs = require('fs')
const superagent = require('superagent')

//reading a keyword from a file, calling the api, and writing to another file 


//using callbacks
// fs.readFile('read-file.txt',(err,data)=>{
//     if(err) console.log(err)
//     if(data){
//         superagent(`https://dog.ceo/api/breeds/image/random/${data}`)
//         .end((err, res)=>{
//             if(err) console.log('no response received')
//             console.log('url : --> ',res.body.message)
//             fs.writeFile('write-file',res.body.message,(err)=>{
//                 console.log(err)
//             })
//         })
//     }
// })

//using promise chaining

//create a readfilepromise and writefilepromise
const readFilePro = (fileName) => {
    return new Promise((resolve, reject)=>{
        fs.readFile(fileName,(err,data)=>{
            if(err) reject("not able to read file")
            if(data){
                resolve(data)
            }
        })
    })
}

const writeFilePro = (fileName, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(fileName,data,(err)=>{
            if(err) reject("not able to write file")
            resolve("write file done")
        })
    })
}


//using promise chaining

// readFilePro('read-file.txt')
// .then((data)=> superagent(`https://dog.ceo/api/breeds/image/random/${data}`))
// .then((res)=> writeFilePro('write-file.txt',res.body.message))
// .catch((err)=> console.log(err))


//async await
async function getURL(){
    const data = await readFilePro('read-file.txt')
    const res =  await superagent(`https://dog.ceo/api/breeds/image/random/${data}`)
    await   writeFilePro('write-file.txt',res.body.message)
}

// getURL()