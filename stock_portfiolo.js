class Stock_Portfiolo {
    constructor() {
        this.portfiolo = {};
    }

    //Adds a new ticker_sym associated with the number of number
    //If the ticker_sym already exist, increment the ticker)sym but shares
    //If user inputs 0 shares or invalid input return -1
    add_ticker_shares(ticker_sym, shares) {
        if (this.valid_input(ticker_sym, shares)) { //check if valid input
            if (!(ticker_sym in this.portfiolo)) { //check if symbol in portfiolo)
                //check if users to adding more than 0 shares otherwise return -1
                if (shares > 0) {
                    this.portfiolo[ticker_sym] = shares;
                    return 1;
                }
                return -1;
            } 

            //already in then increment the shares
            this.portfiolo[ticker_sym] += shares;
            return 1;
        }
        //if input invalid return -1
        return -1;
    }

    //subtract shares from the given ticker_sym, if shares exceed current num of shares then throw an error
    //if invalid input or ticker_sym does not exist return -1
    subtract_shares(ticker_sym, sub_shares) {
        if (this.valid_input(ticker_sym, sub_shares)) { //check if valid input
            if ((ticker_sym in this.portfiolo)) { //check if symbol in port
                //check if possible to subtract shares
                if (this.portfiolo[ticker_sym] >= sub_shares) {
                    //subtract shares
                    this.portfiolo[ticker_sym] -= sub_shares;

                    //if shares become 0, delete it
                    if (this.portfiolo[ticker_sym] <= 0) {
                        console.log("deleted");
                        delete this.portfiolo[ticker_sym];
                    }
                    return 1;
                }

                //otherwise throw an error
                else {
                    throw new Error('ShareSaleException');
                }
            } 
        }
        //if input invalid return -1
        return -1;
    }

    //return the cnt of ticker_sym
    get_ticker_cnt(){
        return Object.keys(this.portfiolo).length;
    }

    //return the number of shares of given ticker_sym otherwise return -1
    get_shares(ticker_sym) {
        if (ticker_sym in this.portfiolo){
            return this.portfiolo[ticker_sym]
        }
        return -1;
    }

    //check if the input (ticker_sym: string, shares: number)
    valid_input(ticker_sym, shares) {
        return typeof(shares) == 'number' && typeof(ticker_sym) == 'string';
    }

}
module.exports = Stock_Portfiolo;