function errHandler(err, req, res, next) {
    if (err.name == "UnauthorizedError") {
        res.status(500).json({ message: "The User is not authorized" });
    }

    if (err.name == "ValidationError") {
        return res.status(401).json({ message: err })
    }

    return res.status(500).json(err);
}

