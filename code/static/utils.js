const store_user = (data) => {
    const {
        name,
        email,
        active,
        restricted,
        role,
        token,
    }= data
    
    localStorage.setItem('user', JSON.stringify({name, email, active, restricted, role, token}))
}

const get_user = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const get_token = () => {
    return JSON.parse(localStorage.getItem('user'))?.token
}

const get_user_role = () => {
    return JSON.parse(localStorage.getItem('user'))?.role
}

const delete_user = () => {
    localStorage.removeItem('user')
}

const update_user_details = (data) => {
    store_user(data)
}

const make_request_ = (url, params, json=true) => {
    const defaultParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': get_token() ?? ''
        },
    }
    return fetch(url, {...defaultParams, ...params}).then(async (res) => {
        if (json) {
            const data = await res.json();
            if (res.status !== 200) {
                throw Error(data.message)
            }
            return data
        } else {
            return res
        }
    })
}

const get = (url, params, json=true) => {
    const defaultParams = {
        method: 'GET'
    }
    return make_request_(url, {...defaultParams, ...params}, json)
}

const post = (url, payload, params, json=true) => {
    const defaultParams = {
        method: 'POST',
        body: JSON.stringify(payload),
    }

    return make_request_(url, {...params, ...defaultParams}, json)
}

export {
    get,
    post,
    update_user_details,
    store_user,
    get_user,
    get_token,
    get_user_role,
    delete_user,
}