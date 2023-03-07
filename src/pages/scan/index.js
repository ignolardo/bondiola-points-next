import { GoogleSpreadsheet } from "google-spreadsheet"
import { useState, useEffect } from "react"

const doc = new GoogleSpreadsheet('1iu3Qk5y7RBsnPmX6bcALv6nP20eHMT0B8lw-7-LwDm0');

module.exports = function Scan() {
    const [sheetName, setSheetName] = useState('');
    const [names, setNames] = useState([]);
    const [codes, setCodes] = useState([]);

    async function SignServiceAccount()
    {
        await doc.useServiceAccountAuth({
            // env var values are copied from service account credentials generated by google
            // see "Authentication" section in docs for more info
            client_email: "bondiola@bondiolapoints.iam.gserviceaccount.com",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDBOuinHLFmNKG5\n5ForWeaebPbp4DcsNxMQxuTGMj+fWgG2Vr6rDaYt7sgHvY6KP0FkMfNtuwEtvczc\nZkIRV9zeXmiIL0A8LG9Y8xLZ0euvsQxhsloucvLA27692KSA+cyOkzzrfn+DEsoD\nzoziq7d7eLS5m+p6i8oYVcesUSWsQToAHvqwS5P6H2Y58I+wQEPu59F9iV+VzJV3\nY/k5IQlGZkZv8snRVs/27/1a+2Ag5BFeShE61M7pOfV5P48ZfyrOoSfei9vtPoQM\n6U1u+e2jsLl2BKlqjfuDl9g2P01ZYCqePHV12ovcInIuIj+lXNahuzaktIHBDAMU\nKkYXMyyzAgMBAAECggEARkMb7wwta4su1Y/1w7a0d54KqJ9ZoI/ENIEGFhWWceTC\nI6HmQf+8Eg62GK5yQs3egsbxC9EIjC/saqYaVwEadJdirkZ0No03zeHRVHgTGfco\nl+vJBAPTRpKBCLpakvWCTsO2TrFYP3qZD4pPS2sCVHjfSnCp8fabvX6PlRaKutf5\nD3SBOT31CrDu2pXLTb5WX3mWAs3mFg/4VsGJUau7yGA7yevAWLbep/EeM7fBCeq9\ntEY8ySCarbDU25wui6+DPoghThfrmRg+Fn+bO6vKXpVMe3Ot7pFvXLe6BnJmhUvu\nRWuP1dVMUiIghXIYhjxIaIyQ1XMVs8TrzktwbiBR+QKBgQDoOFHulgGAhjFD/qMu\npPxm1zBS+gTc2qVbJCI97jlWjrXSHmE7xJkiAoo6ZqSNi7z00yZqz7zEMudYPCLE\nE+mHs3Os64xtqjnjd4cY3CZ/tEa1iABoKerB3+GUD09r97LQ6cji4JeamHIJA8Oc\nqVtSnXvlOU+8jLvuSlB6jqlw+QKBgQDVBHafJNTKkurV1J4+pWBBQhB1an5tG1Sf\nGTi3wu5MxmrIKZb83AFOH169YB6WiQ8d4tup596hZQMpcg/fnH66u+Bo4huruDyp\n6+xjtXRG6K//NKnFki4km/4VNJHysOdkQBLw1BUY1dTEas1ZfFwcf3mpedUdODHm\nNN7idQxiCwKBgHho66LoyTKZYmY9XOPMzMuOfRIpbegOv3r4y4CNS9HkAcdH1Wcm\nU7jc1Evf+Scj9ACGk/8CZIDfXDHWTLibEpY4qJxbLt+WSpn12mk7jgLduWRbdsqM\nIZwRuGgLYEU9lMzazD1H85RHw6mE+CL9dcrqudlr1DqSRsgSZJSH8LgRAoGAe22o\npjIbMn3KoLggMUB185oqGz7nnqTVdZKRsLi8h7P4r56ZpE5+WxwGM0j8sFEedzy5\n90spTu9O07cJx5HQRLcUIvHRAsEwNW1EfcnoZCXzxLZpINfA8OmKYhMh9jPW/9m4\nn97jko5kSKNx9UX/wWuDvVWgzNuA3lkIRMN5t10CgYBn8kAFPzrSUR0/1thXCYHg\nuCUNm7Q9VcA7v3XqgYl/wrAt/vGneUUbo0t8TW/0tZJPj2Qto+0wcK5hCWT+AEim\n04slfOVDg0d5XG4evR5F5MZNoI7ed8vqlrE+8gAzAnatiLyXdUrWlmG4LCc0AITD\nOucpGCxoLLJ/W/6Bk6rbzQ==\n-----END PRIVATE KEY-----\n",
        });

        await doc.loadInfo(); // loads document properties and worksheets
    }

    useEffect(()=>{

        SignServiceAccount();

    },[])
    
    async function GetSheetData() {

        var pointSheet = doc.sheetsByIndex[0];
        setSheetName(pointSheet.title);
        await pointSheet.loadCells('A1:A1');
        await pointSheet.loadCells('B1:B1');

        const usersCell = pointSheet.getCell(0, 0);
        const usersCellJSON = JSON.parse(usersCell.value);

        const otherCell = pointSheet.getCell(0, 1);
        const otherCellJSON = JSON.parse(otherCell.value);

        setNames(usersCellJSON.users);
        setCodes(otherCellJSON.usedCodes);
    }

    async function RemoveLastCode()
    {
        var pointSheet = doc.sheetsByIndex[0];

        await pointSheet.loadCells('B1:B1');

        const otherCell = pointSheet.getCell(0, 1);
        const otherCellJSON = JSON.parse(otherCell.value);

        otherCellJSON.usedCodes.pop();
        otherCell.value = JSON.stringify(otherCellJSON);

        await pointSheet.saveUpdatedCells();

        setCodes(otherCellJSON.usedCodes);
    }

    return <div>
        <p>We are gonna start with the scanning</p>
        <button onClick={GetSheetData}>Get Sheet Data</button>
        <p>Sheet name: {sheetName}</p>
        {/* SHOW USERS */}
        {names.length > 0 ?

            <div>
                <p>{names.length} usuario/s encontrados</p>
                <ul>
                    {
                        names.map((value, index) => {
                            return <li key={index}>

                                <p>User: {value.user} | Points: {value.points}</p>

                            </li>
                        })
                    }
                </ul>

            </div>

            :


            <p>No users</p>}

        {/* SHOW USED CODES */}
        {codes.length > 0 ?

            <div>
                <p>{codes.length} código/s usado/s encontrado/s</p>
                <ul>
                    {
                        codes.map((value, index) => {
                            return <li key={index}>

                                <p>{value}</p>

                            </li>
                        })
                    }
                </ul>
                <button onClick={RemoveLastCode}>Remove last code</button>

            </div>

            :


            <p>No used codes</p>}

    </div>
}