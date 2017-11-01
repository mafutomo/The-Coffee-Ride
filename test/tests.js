const expect = chai.expect

describe('calculator', function () {
  it('is an object', function () {
    expect(add(2,4)).to.equal(6)
  })
})

describe('determine total charges', function () {
  it('adds subtotal with item price including taxes to get total', function () {
    expect(updateTotalVal(10,5,1.03)).to.equal(15)
  })
})
