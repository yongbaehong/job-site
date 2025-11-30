import 'colors'
import faker from 'faker'

import Company from './../resources/company/company.model'
import User from './../resources/user/user.model'
import Job from './../resources/job/jobs.model';

export const seedData = async () => {
  try {
    User.find((err, user) => {
      if (err) { throw err }
      if (!user.length) {
        for (let i = 0; i < 10; i++) {
          let companyName = faker.company.companyName()
          let employeeNumber = faker.datatype.number()
          let streetAddress = faker.address.streetAddress()
          let city = faker.address.city()
          let stateAbbr = faker.address.stateAbbr()
          let zipCode = faker.address.zipCode()
          let description = faker.lorem.paragraphs()

          // create new USER for each company
          new User({
            email: faker.internet.email(),
            password: "tlm",
            hasCompany: true
          }).save().then(user => {
            new Company({
              userId: user._id,
              companyName,
              employeeNumber,
              address: {
                streetAddress,
                city,
                stateAbbr,
                zipCode
              },
              description,
              benefits: {
                insurance: faker.datatype.boolean(),
                daycare: faker.datatype.boolean(),
                medical: faker.datatype.boolean(),
                sick_leave: faker.datatype.boolean(),
                stock_option: faker.datatype.boolean(),
                vacation: faker.datatype.boolean()
              }
            }).save().then(company => {
              User.findByIdAndUpdate(company.userId, { companyId: company._id }).exec()
              for (let j = 0; j < 4; j++) {
                new Job({
                  title: faker.name.jobTitle(),
                  jobType: "Full",
                  description: faker.lorem.paragraph(),
                  industry: faker.name.title(),
                  requiredSkills: [faker.company.catchPhrase(), faker.company.catchPhrase(), faker.company.catchPhrase(), faker.company.catchPhrase()],
                  companyId: company._id
                }).save().then(job => {
                  Company.findByIdAndUpdate(company._id, { $addToSet: { jobs: job._id }, }).exec()
                })
              }
            })
          })
        }

        new User({
          email: 'thelastmile@tlm.org',
          password: "tlm",
          hasCompany: true
        }).save().then(tlm => {
          new Company({
            userId: tlm._id,
            companyName: 'The LastMile(tlm)',
            employeeNumber: '200',
            address: {
              streetAddress: 'LastMile Ave.',
              city: 'San Francisco',
              stateAbbr: 'CA',
              zipCode: '99999'
            },
            description: 'Believe in the process. Developing for success. Paving the road to success. Teaching the carcerated web-development.',
            benefits: {
              insurance: true,
              daycare: true,
              medical: true,
              sick_leave: true,
              stock_option: false,
              vacation: true
            }
          }).save().then(tlmCompany => {
            User.findByIdAndUpdate(tlmCompany.userId, { companyId: tlmCompany._id }).exec()
            let jobT = ["Remote Instructor", "Developer", "Data Science", "Front-End", "Back-End", "Facilitator", "Soft Skills Instructor"]
            for (let j = 0; j < jobT.length; j++) {
              new Job({
                title: jobT[j],
                jobType: "Full",
                description: faker.lorem.paragraph(),
                industry: faker.name.title(),
                requiredSkills: [faker.company.catchPhrase(), faker.company.catchPhrase(), faker.company.catchPhrase(), faker.company.catchPhrase()],
                companyId: tlmCompany._id
              }).save().then(tlmjob => {
                Company.findByIdAndUpdate(tlmCompany._id, { $addToSet: { jobs: tlmjob._id }, }).exec()
              })
            }
          })
        })

      }
    })


  } catch (err) {
    console.log(err)
  }
}
