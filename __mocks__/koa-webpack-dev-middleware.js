export default function(config) {
    return async(ctx,next) => {
        await next()
    }
}
