function handler(req, res) {
    if(req.method === 'POST') {
        const userEmail = req.body.email;
        
        if(!userEmail || !userEmail.includes('@')) {
            // 422: user input was bad
            res.status(422).json({message: 'Invalid Email Address!'});
            return;
        }

        console.log(userEmail);
        res.status(201).json({message: 'Signed Up'})
    }
}

export default handler;
