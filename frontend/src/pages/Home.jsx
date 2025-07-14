import { useAuth } from "../context/AuthContext";
import HeaderBar from "../components/HeaderBar";
import commonStyles from "../styles/commonStyles";
import LatBar from "../components/LatBar";
import formStyle from "../styles/formStyles";


export default function Home() {
  const { role, logout } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeaderBar />
      <div style={{ display: 'flex' }}>
        <LatBar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', padding: '30px 0'}}>
          <div style={{ width: '100%', maxWidth: '700px', marginLeft: '0px' }}>
            <div style={formStyle.container}>
              <h2 style={commonStyles.h2}>Bienvenido al sistema</h2>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
