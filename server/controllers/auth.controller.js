const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const { createAccessToken } = require('../lib/token')
const userTypesModel = require('../models/userTypes.model')

exports.register = async (req, res) => {
    try {
        // Deconstructor gets user input
        const { firstName, lastName, email, password, role } = req.body

        // Validate user input
        if (!(email && password && firstName && lastName && role)) {
            res.status(400).json({
                status: "Failed",
                message: "All fields are required"
            })
        }

        //check for existing user
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists. Please login"
            })
        }

        //Get user account type
        const accountType = await userTypesModel.find({ name: role})

        //Hash password w/ bcrypt
        encryptedPassword = await bcrypt.hash(password, salt)

        //create user in db
        let user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // Sanitize: convert email to lowercase
            password: encryptedPassword,
            role: accountType[0]._id,
        })

        //Add the new user to the correct userTypes array
        const updatedUserArray = await userTypesModel.findById( user.role)
        updatedUserArray['users'].push( user._id)
        updatedUserArray.save()
        
        //create access token 
        const accessToken = createAccessToken({ user: user._id })

        // new query to return user with nly required fields
        user = await User.findById( user._id).populate('role', 'name').select( 'firstName lastName email')

        //return created user
        res.status(201).json({
            status: "Success",
            data: {
                user,
                accessToken,
            }
        })
    } catch (err) {
        console.error(err);
    }
}

exports.login = async (req, res) => {
    try {
        //Deconstructor gets user input
        const { email, password } = req.body

        //validate user input
        if (!(email && password)) {
            res.status(400).json({
                status: "Failed",
                message: "All fields are required"
            })
        }

        // validate if user exists
        let user = await User.findOne({ email })

        // check for user and if passwords match
        if (user && (await bcrypt.compare(password, user.password))) {
            //create access token
            const accessToken = createAccessToken( {user: user._id})

            user = await User.findById( user._id).populate('role', 'name').select('firstName lastName email')

            //return created user
            res.status(201).json({
                status: "Success",
                data: {
                    user,
                    accessToken,

                }
            })
        }

        // return error message if user not found || password mismatch
        res.status(400).json({
            status: "Failed",
            message: "Invalid credentials"
        })

    } catch (err) {
        console.error(err);
    }
}

exports.profile = async( req, res) => {
    try {
        //get authenticated user
        const user = await User.findById( req.user.user).populate( 'role', 'name').select( '-password -createdAt -updatedAt')
        
        //return authenticated user
        res.status( 201).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch (error) {
        console.error( error)
    }
}