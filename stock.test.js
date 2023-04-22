const Stock_Portfiolo = require('./stock_portfiolo.js');

test('constructor initalize empty', () => {
    result = new Stock_Portfiolo();
    expect(Object.keys(result.portfiolo).length).toBe(0);
});

test('Test unique ticker symbol count', () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("RBLX", 10);
    expect(result.get_ticker_cnt()).toBe(2);
});

test('Duplicate (fail) unique ticker symbol count', () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("GME", 10);
    expect(result.get_ticker_cnt()).not.toBe(2);
});

test("Add shares to portfiolo", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("GME", 5);
    expect(result.portfiolo["GME"]).toBe(10);
});

test("Add shares to correct ticker_symbol to portfiolo", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("RBLX", 10);
    result.add_ticker_shares("GME", 2);
    expect(result.portfiolo["GME"]).toBe(7);
    expect(result.portfiolo["RBLX"]).toBe(10);
});

test("Add 0 shares to portfiolo", () => {
    result = new Stock_Portfiolo();
    expect(result.add_ticker_shares("GME", 0)).toBe(-1);
});

test("Subtract Shares", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.subtract_shares("GME", 2);
    expect(result.portfiolo["GME"]).toBe(3);
});

test("Subtract Shares, the correct shares", () =>{
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("RBLX", 10);
    result.subtract_shares("GME", 1);
    expect(result.portfiolo["GME"]).toBe(4);
    expect(result.portfiolo["RBLX"]).toBe(10);
});

test("If ticker have 0 shares, delete", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("RBLX", 10);
    result.subtract_shares("GME", 5);
    expect('GME' in result.portfiolo).toBe(false);
    expect('RBLX' in result.portfiolo).toBe(true);
});

test("Expection sell too many shares", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    expect(() => result.subtract_shares("GME", 6)).toThrow('ShareSaleException');
});

test("Check input validation add_ticker_shares",() => {
    result = new Stock_Portfiolo();
    expect(result.add_ticker_shares(5, "a")).toBe(-1)
});

test("Check input validation subtract_shares", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    expect(result.subtract_shares(5, "a")).toBe(-1)
});

test("get correct number of shares", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    result.add_ticker_shares("RBLX", 10);
    result.subtract_shares("GME", 1);
    expect(result.get_shares("GME")).toBe(4);
    expect(result.get_shares("RBLX")).toBe(10);
});

test("get number of shares of ticker not in port.", () => {
    result = new Stock_Portfiolo();
    result.add_ticker_shares("GME", 5);
    expect(result.get_shares("RBLX")).toBe(-1);
});

