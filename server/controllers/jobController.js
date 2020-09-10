module.exports = {
    //On the front end, define what information you need.
    //Get jobs works in Postman. 
    getJobs: async (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const jobs = await db.jobs.get_jobs(userId)
        res.status(200).send(jobs);
    },
    //This seems to work in postman.
    getOneJob: async (req, res) => {
        const db = req.app.get('db');
        const {userId, jobId} = req.params;
        const job = await db.jobs.get_job([userId, jobId]);
        res.status(200).send(job);
    },
    //this now works in postman. Do job_status_id in a separate endpoint.
    //Now this isn't working in postman. I don't know why. It's making the job title the jobId and the userId undefined. 
    editJob: async (req, res) => {
        console.log('console.log req.params in edit jobs', req.params)
        const {title, location, url, datePosted, description, notes, jobStatusId, company, contact} = req.body;
        const {userId, jobId} = req.params; 
        const db = req.app.get('db');
        const jobs = await db.jobs.edit_job([
            // jobId,
            title,
            location,
            url,
            datePosted,
            description,
            notes,
            company,
            contact,
            jobId,
            userId,
            
        ])
        res.status(200).send(jobs);
    },
    //getting userId and jobId - how?
    deleteJob: async (req, res) => {
        const {userId} = req.session.user;
        const {jobId} = req.params;
        const db = req.app.get('db');
        const jobs = await db.jobs.delete_job([jobId, userId])
        res.status(200).send(jobs);
    },
    addJob: async (req, res) => {
        const {title, location, url, datePosted, description, notes, jobStatusId, company, contact} = req.body;
        const {userId} = req.params; 
        const db = req.app.get('db');
        const jobs = await db.jobs.add_job({
            title,
            location,
            company,
            url,
            datePosted,
            description,
            notes,
            contact,
            jobStatusId,
            userId
        })
        res.status(200).send(jobs)
    }
}