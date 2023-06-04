import { useState } from "react";
import { GetUserGroups } from "../../requestsFirebase/allGetRequests";
import Link from "next/link";

export const UserGroups = () => {
    const [userGroups, setUserGroups] = useState([]);

    GetUserGroups(setUserGroups)

    return (
        <div>
            {userGroups.length > 0 ? (
                <div className="mt-4">
                    {userGroups.map((group) => (
                        <Link key={group.id} href={`/groups/${group.name}`}>
                            <div className="p-4 border mb-3 border-gray-500 hover:border-green-500 w-full rounded hover:text-green-500" key={group.id}>{group.name}</div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 mt-4 text-lg">Você não pertence a nenhuma turma.</div>
            )}
        </div>
    );
};
