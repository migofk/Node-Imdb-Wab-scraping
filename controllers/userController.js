exports.getUserData = async (req, res) => {
    console.log(req.user)
    res.status(200).json({
        success:true,
         user: {
           id: req.user.id,
           firstName: req.user.firstName,
           lastName: req.user.lastName,
           email: req.user.email,
           role: req.user.role,
           createAt: req.user.createAt,
           updatedAt: req.user.updatedAt,
         }
       });

}