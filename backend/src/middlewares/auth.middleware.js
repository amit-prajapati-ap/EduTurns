import { clerkClient } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const protectEducator = asyncHandler(async(req,_,next) => {
    try {
        const userId = req.auth.userId || req.headers.userId;
        const user = await clerkClient.users.getUser(userId)

        if (user.publicMetadata.role !== 'educator') {
            throw new ApiError(401, "Unauthorized Access")
        }

        next()
    } catch (error) {
        throw new ApiError(401, "Invalid user", error)
    }
})

export {protectEducator}