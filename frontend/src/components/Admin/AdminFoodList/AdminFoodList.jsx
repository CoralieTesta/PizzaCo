import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import s from "./style.module.css"
import AdminPizzaItem from '../AdminFoodItem/AdminFoodItem';
import AdminAddFoodBtn from '../AdminAddFoodBtn/AdminAddFoodBtn';
import AdminFoodItem from '../AdminFoodItem/AdminFoodItem';

const AdminFoodList = ({foodList, setFoodList, type}) => {
  return (
    <div className={s.container}>
        <AdminAddFoodBtn foodList={foodList} setFoodList={setFoodList} type={type}/>
        <Table>
                <Thead> 
                    <Tr>
                        <Th className={s.th}>Id</Th>
                        <Th className={s.th}>Nom</Th>
                        <Th className={s.th}>Image</Th>
                        <Th className={s.th}>Description</Th>
                        {type !== "dessert" &&
                            <>
                                <Th className={s.th}>Ingrédients</Th>
                                <Th className={s.th}>Supplément(s)</Th>
                            </>
                        }
                        <Th className={s.th}>Prix</Th>
                        <Th className={s.th}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {foodList?.map((food) => 
                        <AdminFoodItem
                            key={food._id}
                            food={food}
                            foodList={foodList}
                            setFoodList={setFoodList}
                            type={type}
                        />
                    )}
                </Tbody>
            </Table>
    </div>
  )
}

export default AdminFoodList