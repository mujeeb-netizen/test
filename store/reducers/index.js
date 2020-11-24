

const loginReducer = (state={
    uid:null,
    isrc: null,
    docid: null,
    iscon: null,
    gpa: null,
    email: null,
    role: null,
    address:null,
    ahi: null,
    city: null,
    eth: null,
    gender: null,
    state: null,
    zip: null,
    phone: null,
    cun: null,
    cu: null,
    country: null,
    fname: null,
    lname: null,
    pos:null
},action)=>{
    switch(action.type){
        case 'GET_USER':
            return state
        case 'EDIT_UID':
            return state={
                uid:action.uid
            }
        case 'EDIT_USER':
            return state={
                ...state,
                uid:action.uid,
                isrc: action.isrc,
                docid: action.docid,
                gpa: action.gpa,
                email: action.email,
                role: action.role,
                address: action.address,
                ahi: action.ahi,
                city: action.city,
                eth: action.eth,
                gender: action.gender,
                state: action.state,
                zip: action.zip,
                phone: action.phone,
                cun: action.cun,
                cu: action.cu,
                country: action.country,
                fname: action.fname,
                lname: action.lname,
                pos:action.pos
            }
        case 'EDIT_ISRC':
            return state={
                ...state,
                isrc:action.isrc
            }
        case 'EDIT_EMAIL':
            return state={
                ...state,
                email:action.email
            }
        case 'EDIT_ROLE': 
            return state={
                ...state,
                role:action.role
            }
        case 'EDIT_DOCID':
            return state={
                ...state,
                docid: action.docid
            }
        case 'EDIT_GPA':
            return state={
                ...state,
                gpa: action.gpa
            }
        case 'DELETE_USER':
            return state={
                uid:null,
                isrc: null,
                docid: null,
                gpa: null,
                email: null,
                role: null,
                address: null,
                ahi: null,
                city: null,
                eth: null,
                gender: null,
                state: null,
                zip: null,
                phone: null,
                cun: null,
                cu: null,
                country:null,
                fname:null,
                lname: null,
                pos: null
            }
        case 'DELETE_LIBVIEW':
            return state={
                 
                iscon: null
            }
        default: return state
    }
}
export default loginReducer