// тут фетч апишка, запрос на сервер через урлу (fetch возвращает ПРОМИС)
//асинк - говорим что тут асинхронный код
// операторы асинк и аваит всегда в паре, аваит говорит чего ждет асинк

const postData = async (url, data) => { 
    let res = await fetch(url, { 
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
 
    return await res.json(); //тоже ждать пока все преобразуется в жисон
};

const getResource = async (url) => { 
    let res = await fetch(url);

    if (!res.ok) { //.ok - это свойство промиса вернувшегося и fetch
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
        //throw дословно выбрасывает объект ошибки
     }

    return await res.json(); 
};

export {postData};
export {getResource};