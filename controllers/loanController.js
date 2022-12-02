const Loan = require('../models/loanModel');
const APIFeatures = require('../utilities/loanDbContext');
const alert =require('alert')

function Calculate(amount,interest,years) {
  //const months = years*12
  const months = years*12;
  //calculate i = interest/12
  const interests = interest/12;
  //Calculate the PV
  const PV = Math.round((amount/(interests)) * (1-(1/((1+((interests)))**(months))))*100)/100;
  return PV
}

exports.getAllLoans =   async (req, res) => {
  console.log(req.query.name)
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Loan.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const loans = await features.query;

    loans.forEach(function(item) {
      item.calculatedLoanAmount = (Calculate(item.Amount,item.interestRate,item.loanTermYears)).toString();
    })
    console.log(loans)
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: loans.length,
      loans
    
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMyLoans =   async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Loan.find(), req.query)
      .filter(Loan => Loan.Name = req.query.name)
      .sort()
      .limitFields()
      .paginate();
    const loans = await features.query;

    loans.forEach(function(item) {
      item.calculatedLoanAmount = (Calculate(item.Amount,item.interestRate,item.loanTermYears)).toString();
    })
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: loans.length,
      loans
    
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getloan = async (req, res) => {
  try {
    const loans = await Loan.find();
    //Loan.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.createLoan = async  (req, res) => {
  try {
    const newLoan = await Loan.create(req.body);
    res.redirect('/')
    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     loan: newLoan
    //   }
    // })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        loan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};