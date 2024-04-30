(() => {
    const Utils = {
        methods: {
            fibonacci: (n) => {
                let size = document.getElementById("size").value
                const arr = [];
                arr[0] = 0;
                arr[1] = 1;
                for (var i = 2; i < size; i++) {
                    arr[i] = arr[i - 2] + arr[i - 1];
                  }
                return arr;
            },
            
        }
    }
    document.Utils = Utils;
})();