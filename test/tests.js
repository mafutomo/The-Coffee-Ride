const expect = chai.expect

describe('updateTotalVal', function() {
  it('is total charge greater than subtotal', function() {
    expect(updateTotalVal(18, 1.03)).to.equal(true)
  })
})

describe('updateModal', function() {
  it('is updateModal a function', function() {
    expect(updateModal).to.be.a('function')
  })
})

describe('updateCart', function() {
  it('is updateCart a function', function() {
    expect(updateCart).to.be.a('function')
  })
})
