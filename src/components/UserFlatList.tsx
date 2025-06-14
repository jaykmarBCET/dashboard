import { IUsers } from '@/models/user.model';

export const UserFlatList = ({ users }: { users: IUsers[] }) => {
  return (
    <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm text-left whitespace-nowrap">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Company Email</th>
            <th className="px-4 py-2">Office Email</th>
            <th className="px-4 py-2">CIN/PAN/GST</th>
            <th className="px-4 py-2">Agreed</th>
            <th className="px-4 py-2">Recruiter</th>
            <th className="px-4 py-2">Verified</th>
            <th className="px-4 py-2">Updated At</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Courses</th>
            <th className="px-4 py-2">Password</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.length > 0 &&
            users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 max-w-[10ch] truncate" title={String(user.phoneNumber)}>
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 max-w-[20ch] truncate text-blue-400" title={user.email}>
                  {user.email}
                </td>
                <td className="px-4 py-2 max-w-[20ch] truncate">{user.companyEmail}</td>
                <td className="px-4 py-2 max-w-[20ch] truncate">{user.officeEmail}</td>
                <td className="px-4 py-2">{user.cinPanGst}</td>
                <td className="px-4 py-2 text-green-600">
                  {user.agreeToTerms ? '✅' : ''}
                </td>
                <td className="px-4 py-2 text-green-600">
                  {user.isRecruiter ? '✅' : ''}
                </td>
                <td className="px-4 py-2 text-green-600">
                  {user.isVerified ? '✅' : ''}
                </td>
                <td className="px-4 py-2">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 max-w-[20ch] truncate" title={user.id}>
                  {user.id}
                </td>
                <td className="px-4 py-2">
                  {user.favouriteCourses && user.favouriteCourses.length > 0
                    ? user.favouriteCourses.join(', ')
                    : ''}
                </td>
                <td className="px-4 py-2 max-w-[20ch] truncate" title={user.password}>
                  {user.password}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
