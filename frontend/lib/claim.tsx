import config from "config";
export function getAllClaimIds() {
    const tokens = config;
    return tokens.map((token, index) => {
        return {
            params: {
                claimId: index,
            },
        };
    });
}

export function getClaimIdData(id:number) {
    const tokens = config;

    const data = tokens[id]

    // Combine the data with the id
    return {
        id,
        data
    };
}