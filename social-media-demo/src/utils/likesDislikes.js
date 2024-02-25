export const getLikesOrDislikes = async (type) => {
    const likeDislikeParams = new URLSearchParams({
        'ParentID': '1',
        'Type': type
    });
    const res = await fetch(`http://127.0.0.1:5000/getLikesOrDislikes?${likeDislikeParams}`, {
        method: 'GET',
        headers: { 'ContentType': 'application/json' },
    });
    const data = await res.json();
    return data;
};

export const addLikesOrDislikes = async (type) => {
    const requestBody = {
        'ParentID': '1',
        'Type': type,
        'UserName': 'Myra Bhardwaj'
    };
    const res = await fetch(`http://127.0.0.1:5000/addLikeOrDislike`, {
        method: 'POST',
        headers: { 'ContentType': 'application/json' }
    });
    const data = res.json();
    return data;
};