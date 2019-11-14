var session = {
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    remove(key) {
        sessionStorage.removeItem(key);
    },
    setMap(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value,function(k,v){
            let originalObject = this[k];
            if(originalObject instanceof Map) {
                return {
                    dataType: 'Map',
                    value: Array.from(originalObject.entries()),
                };
            } else {
                return v;
            }
        }));
    },
    getMap(key) {
        return JSON.parse(sessionStorage.getItem(key), function(k, v) {
            if(typeof v === 'object' && v !== null) {
                if (v.dataType === 'Map') {
                    return new Map(v.value);
                }
            }
            return v;
        });
    }
};
export default session