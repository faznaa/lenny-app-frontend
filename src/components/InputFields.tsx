import axios from 'axios'
import React, { useEffect } from 'react'
import { mapLoan } from '@/helpers/loanFormat'

const Input = ({ label,placeholder, ...props }: any) => (
    <div>
    <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        type='text'
        {...props}
        className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
    </div>
  </div>
)
export default function InputFields() {

    const [backendRunning,setBackendRunning] = React.useState<boolean>(false)
    useEffect(() => {
      const checkBackend = async() => {
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)
          if(data) setBackendRunning(true)
        } catch (error) {
          console.log(error)
        }
      }
      checkBackend()
    },
    [])
  
    const initialData:any = [
      {label: "Marital Status", placeholder: "Marital Status", value: "user_marital_status",type:'select',options:['Single','Married','Divorced','Widowed']},
      {label: "Credit Score", placeholder: "Credit Score", value: "user_credit_score"},
      {label: "Housing Situation", placeholder: "Housing Situation", value: "user_housing_situation", type:'select',options:['Renting','Mortgage','Own']},
      {label: "Monthly Income", placeholder: "Monthly Income", value: "user_monthly_income"},
      {label: "Loan Amount Requested", placeholder: "Loan Amount Requested", value: "loan_amount_requested"},
      {label: "Loan Term", placeholder: "Loan Term", value: "loan_term"},
      {label: "Loan Payment Frequency", placeholder: "Loan Payment Frequency", value: "loan_payment_frequency"},
      {label: "Loan Purpose", placeholder: "Loan Purpose", value: "loan_purpose"},
      {label: "Loan Security", placeholder: "Loan Security", value: "loan_security"},
      {label: "Loan Additional Notes", placeholder: "Loan Additional Notes", value: "loan_additional_notes"},

    ]
    const initialDataLoan:any = [
      {label: "Lender", placeholder: "Lender", value: "lender"},
      {label: "Amount", placeholder: "Amount", value: "amount"},
      {label: "Interest Rate", placeholder: "Interest Rate", value: "interest_rate"},
      {label: "Term", placeholder: "Term", value: "term"},
      {label: "Repayment Amount", placeholder: "Repayment Amount", value: "repayment_amount"},
      {label: "Repayment Frequency", placeholder: "Repayment Frequency", value: "repayment_frequency"},
      {label: "Loan Conditions", placeholder: "Loan Conditions", value: "loan_conditions"},
    ]
  //   {
  //     lender: "",
  //     amount: "",
  //     interest_rate: "",
  //     term: "",
  //     repayment_amount: "",
  //     repayment_frequency: "",
  //     loan_conditions: "",
  // },
    const [loans, setLoans] = React.useState<any>([
      {
            lender: "",
            amount: "",
            interest_rate: "",
            term: "",
            repayment_amount: "",
            repayment_frequency: "",
            loan_conditions: "",
        },
      
  ])
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
    const [data,setData] = React.useState<any>({
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
        
    })
  const updateData = (e:any) => {
    setData({
        ...data,
        [e.target.name]:e.target.value
    })
  }
  const addLoan = () => {
    if(loans.length >= 2) return alert('You can only add 2 loans')
    setLoans([
        ...loans,
        {
            lender: "",
            amount: "",
            interest_rate: "",
            term: "",
            repayment_amount: "",
            repayment_frequency: "",
            loan_conditions: "",
        },
    ])
  }
  useEffect(() => {
    console.log(data)
  },[data])
  const [response,setResponse] = React.useState<any>({})
  const getResponse = async() => {
    const { data:responseData } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api-1`,{
      ...mapLoan(data,loans)
    },{
      headers:{
        'apiKey':process.env.NEXT_PUBLIC_API_KEY
      }
    })
    console.log(responseData)
    setResponse(responseData)
    setTimeout(() => {
      document.getElementById('assessment')?.scrollIntoView()
    },1000)

  }
  if(!backendRunning) return (<div>

<h3 className='text-2xl font-bold'>Backend is not running </h3>
<p>Please try again in 5 minutes</p>
  </div>)
  return (
    <div className='w-full  bg-gray-100 p-4 rounded-md flex flex-col gap-y-4'>
            <h2 className='text-4xl mb-8 font-bold text-center'>Lenny Loan App</h2>

       <div className='grid grid-cols-2 gap-4'>
       {initialData.map((item:any,index:number) => {
          if(item.type === 'select'){
            return (
              <select name={item.value} onChange={updateData} className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="">Select {item.label}</option>
                {item.options.map((option:any,index:number) => {
                  return (
                    <option key={option} value={option}>{option}</option>
                  )
                })}
              </select>
            )
          }
          return <Input key={index} label={item.label} placeholder={item.placeholder} name={item.value} value={data[item.value]} onChange={updateData} />
        })}
       </div>

       <h2 className='text-2xl font-bold'>Loans Approved</h2>

        <div className='grid grid-cols-2 gap-6'>
        {loans.map((loan:any,index:number) => {
          return (
            <div key={index} className='w-full bg-gray-200 p-4 rounded-md flex flex-col gap-y-4'>
              {initialDataLoan.map((item:any,index:number) => {
                return <Input key={index} label={item.label} placeholder={item.placeholder} name={item.value} value={loan[item.value]} onChange={(e:any) => {
                  let temp = [...loans]
                  temp[index][item.value] = e.target.value
                  setLoans(temp)
                }} />
              })}
            </div>
          )
        })}
        </div>
        <button onClick={()=>addLoan()} className='my-6 bg-blue-500 text-white p-2 max-w-sm rounded-md'>Add Loan</button>


        <button onClick={()=>getResponse()} className='bg-blue-500 text-white p-2 max-w-sm rounded-md'>Submit</button>
        {response?.assessment && <div>
          <h1 className='text-2xl font-bold'>Assessment</h1>
          <p  id="assessment" className='bg-white p-4 rounded-md'>
        {response?.assessment}</p></div>}
        {response?.recommendation && <div>          <h1 className='text-2xl font-bold'>Recommendation</h1>
<p className='bg-white p-4 rounded-md'>
        {response?.recommendation}</p></div>}
    </div>
  )
}
