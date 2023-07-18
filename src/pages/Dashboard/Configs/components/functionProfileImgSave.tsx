import { supabase } from '../../../../services/supabaseConnection';
import { toast } from 'react-toastify';
import { api } from '../../../../services/api';

export async function handleSaveChanges(
  prevNameFile: File,
  cor: string,
  asUser: {
    companyId: string;
    backgroundColor: string;
    imgProfile: string;
    name_company: string;
    email: string;
    id: string;
  },
  pass: string
) {
  await supabase.storage
    .from('filesProfile')
    .upload(`${asUser?.companyId}/${prevNameFile.name}`, prevNameFile)
    .then(async () => {
      const { data } = supabase.storage
        .from('filesProfile')
        .getPublicUrl(`${asUser?.companyId}/${prevNameFile.name}`);

      await api
        .put(
          `/update/${asUser.companyId}`,
          {
            backgroundColor: !cor ? asUser?.backgroundColor : cor,
            imgProfile: data.publicUrl,
          },
          {
            headers: {
              Authorization: pass,
            },
          }
        )
        .then(() => {
          let updateLocalstorage = {
            backgroundColor: !cor ? asUser?.backgroundColor : cor,
            email: asUser?.email,
            id: asUser?.id,
            name_company: asUser?.name_company,
            companyId: asUser?.companyId,
            imgProfile: data.publicUrl ?? asUser?.imgProfile,
          };
          localStorage.setItem(
            '@sessionDelivery',
            JSON.stringify(updateLocalstorage)
          );
          toast.success('Alterações salvas com sucesso!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err: any) => {
          console.log(err);
          toast.error('Senha inválida');
        });
    })
    .catch((err) => {
      console.log(err);
      toast.error('Ops, tente novamente mais tarde!');
    });
}

export async function handleSaveChanges2(
  cor: string | undefined,
  asUser: {
    companyId: string;
    backgroundColor: string;
    imgProfile: string;
    name_company: string;
    email: string;
    id: string;
  },
  pass: string
) {
  await api
    .put(
      `/update/${asUser.companyId}`,
      {
        backgroundColor: cor ?? asUser?.backgroundColor,
        imgProfile: asUser?.imgProfile,
      },
      {
        headers: {
          Authorization: pass,
        },
      }
    )
    .then(() => {
      let updateLocalstorage = {
        backgroundColor: cor ?? asUser?.backgroundColor,
        email: asUser?.email,
        id: asUser?.id,
        name_company: asUser?.name_company,
        companyId: asUser?.companyId,
        imgProfile: asUser?.imgProfile,
      };
      localStorage.setItem(
        '@sessionDelivery',
        JSON.stringify(updateLocalstorage)
      );
      toast.success('Alterações salvas com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err: any) => {
      console.log(err);
      toast.error('Senha inválida');
    });
}

export async function handleSaveChanges3(
  prevNameFile: File,
  asUser: {
    companyId: string;
    backgroundColor: string;
    imgProfile: string;
    name_company: string;
    email: string;
    id: string;
  },
  pass: string
) {
  await supabase.storage
    .from('filesProfile')
    .upload(`${asUser?.companyId}/${prevNameFile.name}`, prevNameFile)
    .then(async () => {
      const { data } = supabase.storage
        .from('filesProfile')
        .getPublicUrl(`${asUser?.companyId}/${prevNameFile.name}`);

      await api
        .put(
          `/update/${asUser.companyId}`,
          {
            backgroundColor: asUser?.backgroundColor,
            imgProfile: data.publicUrl,
          },
          {
            headers: {
              Authorization: pass,
            },
          }
        )
        .then(() => {
          let updateLocalstorage = {
            backgroundColor: asUser?.backgroundColor,
            email: asUser?.email,
            id: asUser?.id,
            name_company: asUser?.name_company,
            companyId: asUser?.companyId,
            imgProfile: data.publicUrl ?? asUser?.imgProfile,
          };
          localStorage.setItem(
            '@sessionDelivery',
            JSON.stringify(updateLocalstorage)
          );
          toast.success('Alterações salvas com sucesso!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err: any) => {
          toast.error('Senha inválida');
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      toast.error('Ops, tente novamente mais tarde!');
    });
}
