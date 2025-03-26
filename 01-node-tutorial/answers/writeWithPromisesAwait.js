const { readFile, writeFile } = require ('fs').promises

const writer = async() => {
    try {
        await writeFile (
            './temporary/temp.txt',
            'my line',
            {flag: 'a'}
        )
    } catch (error){
        console.log(error)
    }
}
//writer()

const reader = async() =>  {
    try{
        const text = await readFile('./temporary/temp.txt', 'utf-8')
        console.log (text)
    } catch (error){
        console.log(error)
    }
}
//reader()

const readWrite = async () => {
    try{
        await reader()
        await writer()
    } catch (error){
        console.log(error)
    }
}
readWrite()