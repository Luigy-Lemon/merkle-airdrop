import config from "config";

export function getAllClaimIds() {
    const tokens = config;
    return tokens.map((token, index) => {
        return {
            params: {
                claimId: index.toString(),
            },
        };
    });
}

export function getClaimIdData(claimId:string) {
    const tokens = config;

    const data = tokens[parseInt(claimId)]

    // Combine the data with the id
    return {
        claimId,
        data
    };
}