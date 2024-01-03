const loan = {
  user_marital_status: "",
    user_credit_score: "",
    user_housing_situation: "",
    user_monthly_income: "",
    loan_amount_requested: "",
    loan_term: "",
    loan_payment_frequency: "",
    loan_purpose: "",
    loan_security: "",
    loan_additional_notes: "",
    approved_loans: [
        {
            lender: "",
            amount: "",
            interest_rate: "",
            term: "",
            repayment_amount: "",
            repayment_frequency: "",
            loan_conditions: "",
        },
    ],
}
export const loanFormat = (loan: any) => {

    return {
        "client_data": {

        "marital_status": "Married",

        "credit_score": "656.00",

        "housing_situation": "Homeowner",

        "monthly_income": "110000.00"

    },

    "loan_application": {

        "amount_requested": 9000,

        "term": 24,

        "payment_frequency": "Weekly",

        "purpose": "Top-up or refinance Lenny loan",

        "security": 9000,

        "additional_notes": "tes test"

    },

    "approved_loans": [

        {

            "lender": "Avanti",

            "amount": 10000,

            "interest_rate": 25,

            "term": 24,

            "repayment_amount": 200,

            "repayment_frequency": "Weekly",

            "loan_conditions": "N\/A"

        },

        {

            "lender": "Finance Now",

            "amount": 9000,

            "interest_rate": 24,

            "term": 24,

            "repayment_amount": 150,

            "repayment_frequency": "Weekly",

            "loan_conditions": "N\/A"

        }

    ]}

}

// user_marital_status: "",
// user_credit_score: "",
// user_housing_situation: "",
// user_monthly_income: "",
// loan_amount_requested: "",
// loan_term: "",
// loan_payment_frequency: "",
// loan_purpose: "",
// loan_security: "",
// loan_additional_notes: "",
export const mapLoan = (user_data:any,loanApprovals: any[]) => {
    const loan = {
        client_data:{
            marital_status: user_data.user_marital_status,
            credit_score: user_data.user_credit_score,
            housing_situation: user_data.user_housing_situation,
            monthly_income: user_data.user_monthly_income,

        },
        loan_application:{
            amount_requested: user_data.loan_amount_requested,
            term: user_data.loan_term,
            payment_frequency: user_data.loan_payment_frequency,
            purpose: user_data.loan_purpose,
            security: user_data.loan_security,
            additional_notes: user_data.loan_additional_notes,
        },
        approved_loans: loanApprovals
        }
    
    return loan
}
