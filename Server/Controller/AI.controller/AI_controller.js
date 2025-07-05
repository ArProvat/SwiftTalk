import main from "../../Config/Gemini_config/Gemini_config.js"

const Ai_controller = async (req, res) => {
    try {
        
        const prompt = req.query.prompt;
        console.log(prompt)
        if (!prompt) {
            res.status(404).json({ message: "prompt not found", error: true })
        }
        
        const result = await main(prompt)

        res.status(200).json({result:result,success:true})

    } catch (error) {
        res.status(404).json({ message: error, error: true })
    }
}

export default Ai_controller